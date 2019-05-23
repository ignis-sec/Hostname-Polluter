# Hostname Polluter
A chrome extension that changes the host header on requests. Useful for hunting down badly configured virtual hosts.


## Use cases:
(From a real case) Imagine an apache server has the following virtualhosts:

- www.example.com  /var/www/html/example
- sub.example.com  /var/www/html/sub
- www.example2.com /var/www/html/example2
- localhost        /var/www/html/

Using this extension, you can fall back to the parent directory from example.com
Or, sometimes people leave stuff on the localhost virtual because they don't think its accessible remotely.
