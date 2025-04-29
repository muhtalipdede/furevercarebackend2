## ngrok kurulumu

-- ngrok'u kurmak için aşağıdaki komutları kullanabilirsiniz: (Sadece bir kere kurma yeterli.)
brew install ngrok

-- ngrok'a giriş yapın ve tokeninizi alın
ngrok config add-authtoken <token>

-- port 3002'de çalışan bir uygulamayı ngrok ile açmak için aşağıdaki komutu kullanabilirsiniz:
ngrok http 3002