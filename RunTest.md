## Running k6 Tests with Kubernetes

1. Create a k6 test script: 
    - Write your k6 test script in JavaScript.
2. Create a Kubernetes deployment file: 
    - Create a YAML file that describes the Kubernetes deployment for running the k6 test.
3. Deploy the k6 test to Kubernetes: 
    - Use the `kubectl` command to deploy the Kubernetes deployment file.
    - Run `kubectl apply -f <deployment-file.yaml>` to create the deployment and start running the k6 test.

    
 For a demo on how to run the test, you can watch this [video](https://www.loom.com/share/0fc0f01e242b480d8da3242b4ed47dcb).
