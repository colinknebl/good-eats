#! /usr/local/bin/bash

grunt dist

scp \
-i /Users/knebco/Documents/good-eats/good-eats.pem \
-r /Users/knebco/Documents/good-eats/v2.good-eats/dist/* \
ubuntu@ec2-18-191-242-158.us-east-2.compute.amazonaws.com:/home/ubuntu/good-eats