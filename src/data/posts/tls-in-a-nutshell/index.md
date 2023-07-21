---
title: TLS in a Nutshell
date: '2023-07-21'
tags: ['tls', 'ssl', 'https', 'security', 'privacy']
summary: A brief explanation of Transport Layer Security (TLS)
thumbnail: /static/blog/tls-in-a-nutshell/thumbnail.jpg
draft: true
---

# What is TLS?

TODO

# Run down of TLS

Firstly, To facilitate TLS, the webmaster has to generate a public/private keys pair.

💬 *If you don't know what public/private keys are, just know that the public key is used to encrypt information while the private key is used to decrypt information. We call this [asymmetric cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography). The actual process is not trivial and involves generating prime numbers ;)*

After that, the webmaster packed the public key along with some information like domain name, expiration date, contact info, ... to create a **[Certificate Signing Request] (CSR)**

Then the **CSR** get submitted to a [Certificate Authority] to be signed.

> Digital Signing is a technique we use to ensure the integrity of information. We perform a cryptographic hash on the combination of the message data and a secret key to generate a digital signature. This signature is sent along with the message. Third parties cannot generate the signature since they don't have the secret key. We verify integrity by generating a new signature from the current message data and compare it with the signature attached on the message, if the data has been tampered with, these 2 signatures won't match.

In TLS, after connecting to a server, your browser first fetch the TLS Certificate from the server.

[Certificate Signing Request]: https://en.wikipedia.org/wiki/Certificate_signing_request
[Certificate Authority]: https://en.wikipedia.org/wiki/Certificate_authority
