var Toolbox = {
  primeFactorization: function (number, f_result) {
    var result = (f_result || {});
    var root = Math.sqrt(number);
    var x = 2;

    if (number % x) {
      x = 3;

      while ((number % x) && ((x = (x + 2)) < root)) { }
    }

    x = (x <= root) ? x : number;

    // result.push(x);
    result[x+'']=1;

    return (x === number) ? result : this.primeFactorization((number / x), result);
  }
}

export default Toolbox;