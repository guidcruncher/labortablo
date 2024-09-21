#!/bin/bash
version="development"

cd api && rm node_modules -r && rm package-lock.json && npm i && cd ..
cd web && rm node_modules -r && rm package-lock.json && npm i && cd ..
