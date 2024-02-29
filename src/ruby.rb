#!/usr/bin/env ruby
require 'webrick'

port = ARGV.empty? ? 3000 : ARGV[0].to_i
root = Dir.pwd
server = WEBrick::HTTPServer.new :Port => port, :DocumentRoot => root

trap 'INT' do server.shutdown end

puts "Server running at http://localhost:#{port}/"
server.start