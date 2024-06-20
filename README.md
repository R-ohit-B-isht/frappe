<div align="center">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset=".github/frappe-framework-logo-dark.svg">
		<img src=".github/frappe-framework-logo.svg" height="50">
	</picture>
	<h3>
		a web framework with <a href="https://www.youtube.com/watch?v=LOjk3m0wTwg">"batteries included"</a>
	</h3>
	<h5>
		it's pronounced - <em>fra-pay</em>
	</h5>
</div>

<div align="center">
	<a target="_blank" href="#LICENSE" title="License: MIT">
		<img src="https://img.shields.io/badge/License-MIT-success.svg">
	</a>
	<a target="_blank" href="https://www.python.org/downloads/" title="Python version">
		<img src="https://img.shields.io-badge/python-%3E=_3.10-success.svg">
	</a>
	<a href="https://frappeframework.com/docs">
		<img src="https://img.shields.io-badge/docs-%F0%9F%93%96-success.svg"/>
	</a>
	<a href="https://github.com/frappe/frappe/actions/workflows/server-tests.yml">
		<img src="https://github.com/frappe/frappe/actions/workflows/server-tests.yml/badge.svg">
	</a>
	<a href="https://github.com/frappe/frappe/actions/workflows/ui-tests.yml">
		<img src="https://github.com/frappe/frappe/actions/workflows/ui-tests.yml/badge.svg?branch=develop">
	</a>
	<a href="https://codecov.io/gh/frappe/frappe">
		<img src="https://codecov.io/gh/frappe/frappe/branch/develop/graph/badge.svg?token=XoTa679hIj"/>
	</a>
</div>

Full-stack web application framework that uses Python and MariaDB on the server side and a tightly integrated client side library. Built for [ERPNext](https://erpnext.com).

<div align="center" style="max-height: 40px;">
	<a href="https://frappecloud.com/frappe/signup">
		<img src=".github/try-on-f-cloud-button.svg" height="40">
	</a>
	<a href="https://labs.play-with-docker.com/?stack=https://raw.githubusercontent.com/gavindsouza/install-scripts/main/frappe/pwd.yml">
		<img src="https://raw.githubusercontent.com/play-with-docker/stacks/master/assets/images/button.png" alt="Try in PWD" height="37"/>
	</a>
</div>

> Login for the PWD site: (username: Administrator, password: admin)

## Table of Contents
* [Installation](#installation)
* [Contributing](#contributing)
* [Resources](#resources)
* [License](#license)

## Installation

### Production
* [Managed Hosting on Frappe Cloud](https://frappecloud.com/)
* [Easy install script using Docker images](https://github.com/frappe/bench/tree/develop#easy-install-script)
* [Manual install using Docker images](https://github.com/frappe/frappe_docker)

### Development
* [Easy install script using Docker images](https://github.com/frappe/bench/tree/develop#easy-install-script)
* [Development installation on bare metal](https://frappeframework.com/docs/user/en/installation)

## Getting Started

To get started you need [Docker](https://docs.docker.com/get-docker/), [docker-compose](https://docs.docker.com/compose/), and [git](https://docs.github.com/en/get-started/getting-started-with-git/set-up-git) setup on your machine. For Docker basics and best practices refer to Docker's [documentation](http://docs.docker.com).

Once completed, chose one of the following two sections for next steps.

### Try in Play With Docker

To play in an already set up sandbox, in your browser, click the button below:

<a href="https://labs.play-with-docker.com/?stack=https://raw.githubusercontent.com/frappe/frappe_docker/main/pwd.yml">
  <img src="https://raw.githubusercontent.com/play-with-docker/stacks/master/assets/images/button.png" alt="Try in PWD"/>
</a>

### Try on your Dev environment

First clone the repo:

```sh
git clone https://github.com/frappe/frappe_docker
cd frappe_docker
```

Then run: `docker compose -f pwd.yml -d`

## Final steps

Wait for 5 minutes for ERPNext site to be created or check `create-site` container logs before opening browser on port 8080. (username: `Administrator`, password: `admin`)

If you ran in a Dev Docker environment, to view container logs: `docker compose -f pwd.yml -d`. Don't worry about some of the initial error messages, some services take a while to become ready, and then they go away.

## Contributing

1. [Code of Conduct](CODE_OF_CONDUCT.md)
1. [Contribution Guidelines](https://github.com/frappe/erpnext/wiki/Contribution-Guidelines)
1. [Security Policy](SECURITY.md)

## Resources

1. [frappeframework.com](https://frappeframework.com) - Official documentation of the Frappe Framework.
1. [frappe.school](https://frappe.school) - Pick from the various courses by the maintainers or from the community.
1. [buildwithhussain.dev](https://buildwithhussain.dev) - Watch Frappe Framework being used in the wild to build world-class web apps.

## License
This repository has been released under the [MIT License](LICENSE).

By contributing to Frappe, you agree that your contributions will be licensed under its MIT License.
