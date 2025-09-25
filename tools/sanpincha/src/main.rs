mod utils;

use std::fs;

use clap::{Parser, Subcommand};
use dotenv::dotenv;
use reqwest::{
    header::{ACCEPT, AUTHORIZATION, USER_AGENT},
    multipart,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct PutJsonDataResponse {
    message: String,
    path: String,
}

async fn _get_data<T: for<'de> Deserialize<'de>>(path: String) -> T {
    let config = utils::get_config();

    let request_url = format!("{}{}", config.base_url, path);
    let client = reqwest::Client::new();

    let response = client
        .get(&request_url)
        .header(USER_AGENT, "sanpincha")
        .header(ACCEPT, "application/json")
        .send()
        .await;

    let response = match response {
        Ok(res) if res.status().is_success() => res,
        _ => panic!("Request failed"),
    };

    let res_data = response
        .json::<T>()
        .await
        .expect("Something went wrong while parsing");

    res_data
}

async fn _put_json_data<T: Serialize>(path: String, req_body: &T) -> PutJsonDataResponse {
    let config = utils::get_config();

    let request_url = format!("{}{}", config.base_url, path);
    let auth_header = format!(
        "Basic {}",
        utils::encode_base64(&format!(
            "{}:{}",
            config.basic_auth_username, config.basic_auth_password
        ))
    );
    let client = reqwest::Client::new();

    let response = client
        .put(&request_url)
        .header(USER_AGENT, "sanpincha")
        .header(ACCEPT, "application/json")
        .header(AUTHORIZATION, &auth_header)
        .json(req_body)
        .send()
        .await;

    let response = match response {
        Ok(res) if res.status().is_success() => res,
        _ => panic!("Request failed"),
    };

    let res_data = response
        .json::<PutJsonDataResponse>()
        .await
        .expect("Something went wrong while parsing");

    res_data
}

struct FileData {
    name: String,
    content: Vec<u8>,
}

#[derive(Debug, Serialize, Deserialize)]
struct PutFileDataResponse {
    uploaded: String,
    key: String,
}

async fn put_file_data(path: String, file_data: FileData) -> PutFileDataResponse {
    let config = utils::get_config();

    let request_url = format!("{}{}", config.base_url, path);
    let auth_header = format!(
        "Basic {}",
        utils::encode_base64(&format!(
            "{}:{}",
            config.basic_auth_username, config.basic_auth_password
        ))
    );
    let client = reqwest::Client::new();

    let part = multipart::Part::bytes(file_data.content).file_name(file_data.name.clone());
    let form = reqwest::multipart::Form::new()
        .text("name", file_data.name)
        .part("file", part);

    let response = client
        .put(&request_url)
        .header(USER_AGENT, "sanpincha")
        .header(AUTHORIZATION, &auth_header)
        .multipart(form)
        .send()
        .await;

    let response = match response {
        Ok(res) if res.status().is_success() => res,
        _ => panic!("Request failed"),
    };

    let res_data = response
        .json::<PutFileDataResponse>()
        .await
        .expect("Something went wrong while parsing");

    res_data
}

#[derive(Parser, Debug)]
struct Cli {
    #[clap(subcommand)]
    command: Commands,
}

#[derive(Debug, Subcommand)]
enum Commands {
    /// Equivalent to PUT request
    Put {
        path: String,

        #[clap(short = 'f', long = "file", help = "File path")]
        file: Option<String>,
    },
}

#[tokio::main]
async fn main() {
    dotenv().ok();

    let cli = Cli::parse();

    match cli.command {
        Commands::Put { path, file } => match path.as_str() {
            "/admin/images/favorites" => {
                let filepath = file.expect("file is required");
                let filename = filepath.split('/').last().unwrap().to_string();
                let file_data = fs::read(filepath).expect("Unable to read file");

                let data = put_file_data(
                    path,
                    FileData {
                        name: filename,
                        content: file_data,
                    },
                )
                .await;

                println!("-------------------------");
                println!("uploaded: {:?}", data.uploaded);
                println!("key: {:?}", data.key);
            }
            _ => {
                println!("Invalid path");
            }
        },
    }
}
