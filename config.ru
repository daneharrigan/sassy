require "sinatra"
require "sass"
require "compass"

disable :protection

post "/generate" do
  headers(
    "Access-Control-Allow-Origin" =>  "*",
    "Access-Control-Allow-Headers" => "Content-Type")
  content_type "text/css"

  content = request.body.read
  type    = request.env["CONTENT_TYPE"].split("/")[1].to_sym

  options = Compass.sass_engine_options.merge(syntax: type)
  Sass::Engine.new(content, options).render
end

options "/generate" do
  headers(
    "Access-Control-Allow-Origin" =>  "*",
    "Access-Control-Allow-Headers" => "Content-Type")
end

get "/" do
  File.read("public/index.html")
end

run Sinatra::Application
