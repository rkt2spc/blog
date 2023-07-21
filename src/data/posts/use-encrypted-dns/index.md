---
title: Use Encrypted DNS
date: '2023-07-22'
tags: ['dns', 'dnscrypt', 'doh', 'dot', 'security', 'privacy']
summary: A guide on how to use encrypted DNS
thumbnail: /static/blog/use-encrypted-dns/thumbnail.jpg
draft: false
---

# The DNS protocol

When you type an address into the browser, e.g [https://google.com](https://google.com)

The browser first has to figure out, for the [domain name] **google.com** what is the [IP address] behind it, for example `74.125.130.139`

This process is called DNS resolution. It involves a DNS query from your browser to a pre-configured DNS resolver followed by a series of exchanges between a hierarchy of DNS resolvers.

Unfortunately, at the time of writing, these DNS communications are unencrypted, or as we like to say, plaintext.

# Harms of using plaintext DNS

By using plaintext DNS, you're allowing your internet service provider (ISP) to read, monitor, block the domain names you are visiting.

💬 *DNS blocking is still one of the most popular and cost-effective method to implement website access restriction, at both government and enterprise levels.*

Besides your ISP, using plaintext DNS on public Wi-Fi also allow the Wi-Fi owner to achieve the same effect.

If someone else reading your browsing history doesn't creep you up enough. They not only can block your DNS request, they can also fabricate a DNS response to you too.

So even though **x.com** is supposed to be at IP `1.2.3.4` you can actually be visiting a malicious server at `5.6.7.8` acting as **x.com**. This is commonly known as [DNS Spoofing].

However, the use of [TLS], or more commonly known under the form [HTTPS] (yes, the prefix in-front of your address), somewhat protect you from DNS Spoofing exploits as the TLS certificate issued by [Certificate Authorities](https://en.wikipedia.org/wiki/Certificate_authority) requires a domain ownership proof. If you want to know more about TLS, checkout my previous article [TLS in a Nutshell](/blog/tls-in-a-nutshell).

# Using Encrypted DNS

There are many protocols for encrypting your DNS traffic. Some of the popular ones are:

- [DoT] (DNS-over-TLS)
- [DoH] (DNS-over-HTTPS)
- [DNSCrypt]

Unfortunately, most of the applications you use nowadays does not support these protocols yet.

To overcome this issue, we can use a local DNS proxy that accepts plaintext DNS queries on your personal computer, and then speak encrypted DNS with supported resolvers.

![DNS Proxy](./dns-proxy.png)

# Introducing DNSCrypt Proxy

[DNSCrypt Proxy] is one of the implementations of encrypted DNS proxy I mentioned earlier.

Despite the name, it actually supports both the DoH and DNSCrypt protocols.  
It also has other features like DNS filtering, DNS cloaking, etc

## Setting up DNSCrypt Proxy on MacOS

### Installation

It can be easily installed with [Homebrew]

```sh
brew install dnscrypt-proxy
```

### Configuring

Next you'll want to edit the proxy's config at `$(brew --prefix)/etc/dnscrypt-proxy.toml` (it usually resolves to `/usr/local/etc/dnscrypt-proxy.toml`)

There are many configurable options, feel free to do your own research. But the only thing you really need to care about is which resolvers you prefer to use. They're configured under the field `server_names`  
I usually use (in fallback order): [Cloudflare], [Quad9] and [Google]

```toml
# dnscrypt-proxy.toml
server_names = [
  'cloudflare',
  'cloudflare-ipv6',
  'quad9-dnscrypt-ip4-nofilter-pri',
  'quad9-dnscrypt-ip4-nofilter-alt',
  'quad9-dnscrypt-ip6-nofilter-pri',
  'quad9-dnscrypt-ip6-nofilter-alt',
  'google',
]
```

- [Cloudflare] is currently one of the most popular Content Delivery Network (CDN) provider. They own the DNS resolver at [**1.1.1.1**](https://1.1.1.1)
- [Quad9] they are reputable, secure, privacy focused DNS service provider based in Switzerland. They own the DNS resolver at **9.9.9.9**
- [Google] well... they are Google. They own the DNS resolvers at **8.8.8.8** and **8.8.4.4**

### Starting the proxy

After you're happy with the configuration, you can start the proxy with

```sh
sudo brew services start dnscrypt-proxy
```

Note: It needs *sudo* because it's binding to port 53 (the first 1024 ports are restricted to the **root** user)

And voila! Your very own DNS resolver is up and running on your personal computer!

### Using the proxy

All that left is to configure MacOS to use the proxy.

- Go to your **System Settings**
- Select **Network**
- View details of the network (Wifi / Ether) you're using
- Open the **DNS** tab, remove all other entries and put **127.0.0.1** (*localhost*) as your resolver.

![DNS Config MacOS](./dns-config-macos.png)

Note: On MacOS, there's a nifty [xbar] plugin called [dnscrypt-proxy-switcher](https://xbarapp.com/docs/plugins/Network/dnscrypt-proxy-switcher.10s.sh.html) that let you do these steps easily.

## Setting up DNSCrypt Proxy on other Operating Systems

Check out DNSCrypt Proxy's [official Installation Guide](https://github.com/DNSCrypt/dnscrypt-proxy/wiki/Installation) for installation instructions on other platforms.

# Final Words

Using encrypted DNS is a good practice that improves security & privacy. You should start using encrypted DNS today.

Thank everyone for reading!

[Domain Name]: https://en.wikipedia.org/wiki/Domain_name
[IP Address]: https://en.wikipedia.org/wiki/IP_address
[TLS]: https://en.wikipedia.org/wiki/Transport_Layer_Security
[HTTPS]: https://en.wikipedia.org/wiki/HTTPS
[DNS Spoofing]: https://en.wikipedia.org/wiki/DNS_spoofing
[DoT]: https://en.wikipedia.org/wiki/DNS_over_TLS
[DoH]: https://en.wikipedia.org/wiki/DNS_over_HTTPS
[DNSCrypt]: https://www.dnscrypt.org
[DNSCrypt Proxy]: https://github.com/DNSCrypt/dnscrypt-proxy
[Homebrew]: https://brew.sh
[CloudFlare]: https://www.cloudflare.com
[Quad9]: https://www.quad9.net
[Google]: https://google.com
[xbar]: https://xbarapp.com
