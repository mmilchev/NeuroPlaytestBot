# NeuroSlicers Playtest bot, AKA Dreico

This bot is in development by Milcho, HRCK0 and Sqbika in order for the NeuroSlicers playtest to go smoothly. This bot creates the playtest pairs, create a workflow to follow and other small utilities to make playtesting easier.

## Prerequisites

A working PostgreSQL setup.

## Installation

1. Download the repo: `git clone https://github.com/mmilchev/NeuroPlaytestBot/`
2. Go into the folder (`cd NeuroPlaytestBot`) and run `npm i`
3. Rename the `authExample.json` to `auth.json` and edit the values inside  
    login: The bot's login token  
    postgresPath: the `postgres://<USER>:<PASSWORD>@<URL>:<PORT>/<DATABASE>`  
4. Run the bot (`pm2, node, other, (or screen + node if you are masochist`)
