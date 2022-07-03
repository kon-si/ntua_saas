FROM python:3.10-slim-buster

# Create app directory
WORKDIR /usr/src/flows_parser

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

# Bundle app source
COPY . .

CMD [ "python3", "parser-flows.py" ]