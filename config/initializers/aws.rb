Aws.config.update({
  region: 'Oregon',
  credentials: Aws::Credentials.new(ENV['AKIAJTXU6ODJFSNWQ5VA'], ENV['DNf3X97Imm+cBIE8hHHTLiFHidlpnl6K6wnG+6qO']),
})

S3_BUCKET = Aws::S3::Resource.new.bucket(ENV['groupchat'])