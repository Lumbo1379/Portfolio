.DEFAULT_GOAL := help
ANSIBLE=ansible-playbook playbook.yml --ask-become-pass -v

common: # Install common packages
	$(ANSIBLE) --tags common
.PHONY: common

frontend: # Install all frontend tagged packages
	$(ANSIBLE) --tags frontend
.PHONY: common

react: # Install pakcages for React development
	$(ANSIBLE) --tags react
.PHONY: common

help: # Print command helps
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; \
	do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done
.PHONY: help