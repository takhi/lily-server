function Lily(numbers, target) {
    let solutions = [];
    if (target) {
        combinator(numbers, target, []);
        return solutions;
    }

    function add(chain) {
        let expression = merge(chain);
        if (solutions.indexOf(expression) === -1) solutions.push(expression);
    }

    function combinator(numbers, target, chain) {
        let i, j, cut;
        if (numbers.length === 2) {
            if (numbers[0] + numbers[1] === target) {
                add(chain.concat(numbers[0] + '+' + numbers[1]));
                return;
            }
            if (numbers[0] - numbers[1] === target) {
                add(chain.concat(numbers[0] + '-' + numbers[1]));
                return;
            }
            if (numbers[0] * numbers[1] === target) {
                add(chain.concat(numbers[0] + '*' + numbers[1]));
                return;
            }
            if (numbers[1] !== 0) {
                if (numbers[0] / numbers[1] === target) {
                    add(chain.concat(numbers[0] + '/' + numbers[1]));
                    return;
                }
            }
        } else {
            for (i = 0; i < numbers.length; i++) {
                for (j = 0; j < numbers.length; j++) {
                    if (i !== j) {
                        cut = shiftCut(numbers, i, j);
                        if ((cut[0] = numbers[i] + numbers[j]) === target) {
                            add(chain.concat(numbers[i] + '+' + numbers[j]));
                            break;
                        }
                        combinator(cut, target, chain.concat(numbers[i] + '+' + numbers[j] + '=' + cut[0]));
                        if ((cut[0] = numbers[i] - numbers[j]) === target) {
                            add(chain.concat(numbers[i] + '-' + numbers[j]));
                            break;
                        }
                        combinator(cut, target, chain.concat(numbers[i] + '-' + numbers[j] + '=' + cut[0]));
                        if ((cut[0] = numbers[i] * numbers[j]) === target) {
                            add(chain.concat(numbers[i] + '*' + numbers[j]));
                            break;
                        }
                        combinator(cut, target, chain.concat(numbers[i] + '*' + numbers[j] + '=' + cut[0]));
                        if (numbers[1] !== 0) {
                            if ((cut[0] = numbers[i] / numbers[j]) === target) {
                                add(chain.concat(numbers[i] + '/' + numbers[j]));
                                break;
                            }
                            combinator(cut, target, chain.concat(numbers[i] + '/' + numbers[j] + '=' + cut[0]));
                        }
                    }
                }
            }
        }
    }
}

function merge(chain) {
    let i = chain.length - 2, segment;
    let expression = chain[i + 1];
    for (; i >= 0; i--) {
        segment = chain[i].split('=');
        expression = expression.replace(segment[1], '(' + segment[0] + ')');
    }
    return expression;
}

function shiftCut(array, i, j) {
    let k = 0, m = 1, cut = [];
    for (; k < array.length; k++) {
        if (k !== i && k !== j) {
            cut[m++] = array[k];
        }
    }
    return cut;
}

module.exports = Lily;