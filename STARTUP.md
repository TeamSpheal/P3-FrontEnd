# Deploying the Application

The application can currently be built manually for testing or with AWS
CodePipeline.

## Manual Deployment

Prerequisites:
- npm
- Angular CLI
- A running instance of the 
  [P3-BackEnd](https://github.com/TeamSpheal/P3-BackEnd).

1) Clone the repo.
2) In the repo's root folder, execute the following commands:
    ```
    npm install
    ng serve
    ```

That application can be viewed in a web browser at
http://localhost:4200/

## Automated Deployment

The application currently supports automated deployment to an S3 bucket
with AWS CodePipeline. As above, this requires a running instance of the
P3-BackEnd.

#### Initial steps
1) Configure an S3 bucket and configure it to serve as a static website.
2) Edit the file src\environments\environment.prod.ts
    - Change "baseUrl" to be the URL of the running backend intance.
    - Change the value for the Access-Control-Allow-Origin in the headers
      object to be the URL of the S3 bucket.

#### Deployment
1) Configure an AWS CodeBuild project 
	- Set this repo as the source.
	- You can use the following for the buildspec file
		```
		version: 0.2

		phases:
		  install:
			commands:
			  - curl -fsSL https://dev.nodesource.com/setup_16.x | sudo -E bash -
			  - yum install gcc-c++ make
		  pre_build:
			commands:
			  - npm i -g @angular/cli
			  - npm install --force
		  build:
			commands:
			  - ng build

		artifacts:
		  files:
			- "**/*"
		  discard-paths: no
		  base-directory: dist/social-media-angular
		```
		
2) Create a AWS CodePipeline.
	- Set the GitHub (Version 2) as the source provider
	- Set the Codebuild project from step 3 as the connection.
3) You can either chose to start the pipeline on changes to the repo or to start
manually. If you chose to start on changes, push a change to the repo. Otherwise
press the "Create pipeline" button.
4) Once the pipeline completes, the application will be available at the URL of
the S3 bucket.