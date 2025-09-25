use std::{fs::File, io::BufReader};

use base64::prelude::*;

pub struct Config {
    pub basic_auth_username: String,
    pub basic_auth_password: String,
    pub base_url: String,
}

pub fn get_config() -> Config {
    let username = std::env::var("IMAGES_WORKER_BASIC_AUTH_USERNAME").expect("IMAGES_WORKER_BASIC_AUTH_USERNAME is not set");
    let password = std::env::var("IMAGES_WORKER_BASIC_AUTH_PASSWORD").expect("IMAGES_WORKER_BASIC_AUTH_PASSWORD is not set");
    let base_url: String = std::env::var("IMAGES_WORKER_BASE_URL").expect("IMAGES_WORKER_BASE_URL is not set");

    Config {
        basic_auth_username: username,
        basic_auth_password: password,
        base_url,
    }
}

pub fn _get_local_json_data(path: &str) -> serde_json::Map<String, serde_json::Value> {
    let file = File::open(path).unwrap();
    let reader = BufReader::new(file);
    let json_data: serde_json::Value = serde_json::from_reader(reader).unwrap();
    let input: &serde_json::Map<String, serde_json::Value> = json_data.as_object().unwrap();
    input.clone()
}

pub fn encode_base64(text: &str) -> String {
    BASE64_STANDARD.encode(text.as_bytes())
}
