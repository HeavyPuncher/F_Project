class ActivationFunction {
    constructor(func, dfunc) {
      this.func = func;
      this.dfunc = dfunc;
    }
  }
//
  
  let sigmoid = new ActivationFunction(
    x => 1 / (1 + Math.exp(-x)),
    y => y * (1 - y)
  );
  
  let tanh = new ActivationFunction(
    x => Math.tanh(x),
    y => 1 - (y * y)
  );
//2 methods of activation function 
  
  
  class NeuralNetwork {
    /*
    * if first argument is a NeuralNetwork the constructor clones it
    * USAGE: cloned_nn = new NeuralNetwork(to_clone_nn);
    */
    constructor(in_nodes, hid_nodes, out_nodes) {
      if (in_nodes instanceof NeuralNetwork) {
        let a = in_nodes;
        this.input_nodes = a.input_nodes;
        this.hidden_nodes = a.hidden_nodes;
        this.output_nodes = a.output_nodes;
  
        this.weights_ih = a.weights_ih.copy();
        this.weights_ho = a.weights_ho.copy();
  
        this.bias_h = a.bias_h.copy();
        this.bias_o = a.bias_o.copy();
      } else {
        this.input_nodes = in_nodes;
        this.hidden_nodes = hid_nodes;
        this.output_nodes = out_nodes;
  
        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();
  
        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_o = new Matrix(this.output_nodes, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();
      }
  
      // TODO: copy these as well
      this.setLearningRate();
      this.setActivationFunction();
  
  
    }
  
    predict(input_array) {
  
      // Generating the Hidden Outputs
      let inputs = Matrix.fromArray(input_array);
      let hidden = Matrix.multiply(this.weights_ih, inputs);
      hidden.add(this.bias_h);
      // activation function!
      hidden.map(this.activation_function.func);
        //map activation function to one of the hidden layers
  
      // Generating the output's output!
      let output = Matrix.multiply(this.weights_ho, hidden);
      output.add(this.bias_o);
      output.map(this.activation_function.func);
  
      // Sending back to the caller!
      return output.toArray();
    }
  
    setLearningRate(learning_rate = 0.1) {
      this.learning_rate = learning_rate;
    }
  
    setActivationFunction(func = sigmoid) {
      this.activation_function = func;
        //sets activation function = sigmoid function
    }
  
    train(input_array, target_array) {
      // Generating the Hidden Outputs
      let inputs = Matrix.fromArray(input_array);
      let hidden = Matrix.multiply(this.weights_ih, inputs);
        //multiply weights and inputs
        //convert arrays into matrices
      hidden.add(this.bias_h);
      // activation function!
        //add bias...
      hidden.map(this.activation_function.func);
        //hidden layers are held in matrices for js
        //map hidden layer to activation function
  
      // Generating the output's output!
      let outputs = Matrix.multiply(this.weights_ho, hidden);
      //multiply
        outputs.add(this.bias_o);
        //outputs the bias
      outputs.map(this.activation_function.func);
        //activation function is mapped to output
  
      // Convert array to matrix object
      let targets = Matrix.fromArray(target_array);
        //get targets (training data)
  
      // Calculate the error
      // ERROR = TARGETS - OUTPUTS
      let output_errors = Matrix.subtract(targets, outputs);
        //to check if improvement is needed for ai
//        console.log()
  
      // let gradient = outputs * (1 - outputs);
      // Calculate gradient
      let gradients = Matrix.map(outputs, this.activation_function.dfunc);
        console.log(gradients);
      gradients.multiply(output_errors);
      gradients.multiply(this.learning_rate);
        // higher gradient learning faster and etc.
  
  
      // Calculate deltas (eq)
      let hidden_T = Matrix.transpose(hidden);
      let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);
  
      // Adjust the weights by deltas
      this.weights_ho.add(weight_ho_deltas);
      // Adjust the bias by its deltas (which is just the gradients)
      this.bias_o.add(gradients);
        //every time something happens, weight needs to be updated so that neural network is able to learn, otherwise it will think it's always right
  
      // Calculate the hidden layer errors
      let who_t = Matrix.transpose(this.weights_ho);
      let hidden_errors = Matrix.multiply(who_t, output_errors);
        console.log(hidden_errors)
        
  
      // Calculate hidden gradient
      let hidden_gradient = Matrix.map(hidden, this.activation_function.dfunc);
      hidden_gradient.multiply(hidden_errors);
      hidden_gradient.multiply(this.learning_rate);
  
      // Calcuate input->hidden deltas
      let inputs_T = Matrix.transpose(inputs);
      let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);
  
      this.weights_ih.add(weight_ih_deltas);
      // Adjust the bias by its deltas (which is just the gradients)
      this.bias_h.add(hidden_gradient);
  
      // outputs.print();
      // targets.print();
      // error.print();
    }
  
    serialize() {
      return JSON.stringify(this);
    }
  
    static deserialize(data) {
      if (typeof data == 'string') {
        data = JSON.parse(data);
      }
      let nn = new NeuralNetwork(data.input_nodes, data.hidden_nodes, data.output_nodes);
      nn.weights_ih = Matrix.deserialize(data.weights_ih);
      nn.weights_ho = Matrix.deserialize(data.weights_ho);
      nn.bias_h = Matrix.deserialize(data.bias_h);
      nn.bias_o = Matrix.deserialize(data.bias_o);
      nn.learning_rate = data.learning_rate;
      return nn;
    }
  
  
    // Adding function for neuro-evolution
    copy() {
      return new NeuralNetwork(this);
    }
  
    // Accept an arbitrary function for mutation
    mutate(func) {
      this.weights_ih.map(func);
      this.weights_ho.map(func);
      this.bias_h.map(func);
      this.bias_o.map(func);
    }
      //input mutation, throw some randomness in the neural network

  }