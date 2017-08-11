#!/bin/bash
FQDN=$1

# make directories to work from
mkdir -p certs/{server,client,ca,tmp}

# Create your very own Root Certificate Authority
openssl genrsa \
  -out certs/ca/my-root-ca.key.pem \
  2048

# Self-sign your Root Certificate Authority
# Since this is private, the details can be as bogus as you like
openssl req \
  -x509 \
  -new \
  -nodes \
  -key certs/ca/my-root-ca.key.pem \
  -days 1024 \
  -out certs/ca/my-root-ca.crt.pem \
  -subj "/C=US/ST=Washingtom/L=Seattle/O=ACME Signing Authority Inc/CN=example.com"

# Create a Device Certificate for each domain,
# such as example.com, *.example.com, awesome.example.com
# NOTE: You MUST match CN to the domain name or ip address you want to use
openssl genrsa \
  -out certs/server/privkey.pem \
  2048

# Create a request from your Device, which your Root CA will sign
openssl req -new \
  -key certs/server/privkey.pem \
  -out certs/tmp/csr.pem \
  -subj "/C=US/ST=Washingtom/L=Seattle/O=ACME Tech Inc/CN=${FQDN}"

# Sign the request from Device with your Root CA
# -CAserial certs/ca/my-root-ca.srl
openssl x509 \
  -req -in certs/tmp/csr.pem \
  -CA certs/ca/my-root-ca.crt.pem \
  -CAkey certs/ca/my-root-ca.key.pem \
  -CAcreateserial \
  -out certs/server/cert.pem \
  -days 500

# Create a public key, for funzies
# see https://gist.github.com/coolaj86/f6f36efce2821dfb046d
openssl rsa \
  -in certs/server/privkey.pem \
  -pubout -out certs/client/pubkey.pem

# Put things in their proper place
rsync -a certs/ca/my-root-ca.crt.pem certs/server/chain.pem
rsync -a certs/ca/my-root-ca.crt.pem certs/client/chain.pem
cat certs/server/cert.pem certs/server/chain.pem > certs/server/fullchain.pem
rm -rf certs/tmp
