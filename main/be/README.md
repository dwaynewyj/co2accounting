Copyright (C) 2023 - All Rights Reserved

- You may not use, distribute and modify this code under the terms of the legal license.

# SCOP3 BE

- Description: `SCOP3 @ Standard Carbon`.
- Author: Nick Jang
- Created: 202308010540

## Setup Project:

```
npm install
```

## Setup Inventory Report Environment:

```
brew install wkhtmltopdf
where wkhtmltopdf
$ /usr/local/bin/wkhtmltopdf
Change PATH_WKHTMLTOPDF value

```

## Setup Inventory Report Service:

```
cd /main/be

python3 -m venv .venv
source .venv/bin/activate
pip3 install Jinja2 pdfkit pymongo
pip3 list
deactivate
```
