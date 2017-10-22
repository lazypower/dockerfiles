.PHONY: build clean

build:
	docker build -t hugo .

clean:
	docker rmi hugo
	rm -rf site

test: build
	mkdir -p site
	docker run --rm -v $(PWD)/site:/site --entrypoint hugo hugo new site .
	docker run --rm -v $(PWD)/site:/site -p 1313:1313 hugo
