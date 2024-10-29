function calculateConstantTerm(points, k) {
    // Extract x and y values
    const xValues = points.map(point => point.x);
    const yValues = points.map(point => point.y);
    
    // Get all possible combinations of k points
    const combinations = getCombinations(xValues, yValues, k);
    const results = [];
    
    // Process each combination
    for (const [xComb, yComb] of combinations) {
        const constant = calculateSingleCombination(xComb, yComb);
        if (constant !== null) {
            results.push(constant);
        }
    }
    
    if (results.length === 0) return null;
    
    // Round results to handle floating point precision
    const roundedResults = results.map(x => Number(x.toFixed(6)));
    return findMostCommon(roundedResults);
}


function calculateSingleCombination(xValues, yValues) {
    const n = xValues.length;
    if (n < 2) return null;
    
    // Create matrix for the system of equations
    const matrix = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        const x = xValues[i];
        for (let power = n - 1; power >= 0; power--) {
            row.push(Math.pow(x, power));
        }
        matrix.push(row);
    }
    
    // Solve using Gaussian elimination
    const coefficients = gaussianElimination(matrix, yValues);
    return coefficients ? coefficients[coefficients.length - 1] : null;
}


function getCombinations(xValues, yValues, k) {
    const result = [];
    const n = xValues.length;
    
    function* combinations(arr, k) {
        const n = arr.length;
        if (k > n) return;
        const indices = Array(k).fill(0).map((_, i) => i);
        yield indices.map(i => arr[i]);
        while (true) {
            let idx = k - 1;
            while (idx >= 0 && indices[idx] === n - k + idx) idx--;
            if (idx < 0) return;
            indices[idx]++;
            for (let i = idx + 1; i < k; i++) {
                indices[i] = indices[i - 1] + 1;
            }
            yield indices.map(i => arr[i]);
        }
    }
    
    for (const xComb of combinations(xValues, k)) {
        const indices = xComb.map(x => xValues.indexOf(x));
        const yComb = indices.map(i => yValues[i]);
        result.push([xComb, yComb]);
    }
    
    return result;
}


function gaussianElimination(matrix, constants) {
    const n = matrix.length;
    const augmentedMatrix = matrix.map((row, i) => [...row, constants[i]]);
    
    // Forward elimination
    for (let i = 0; i < n - 1; i++) {
        let maxRow = i;
        let maxVal = Math.abs(augmentedMatrix[i][i]);
        
        // Find the row with maximum value in current column
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(augmentedMatrix[j][i]) > maxVal) {
                maxVal = Math.abs(augmentedMatrix[j][i]);
                maxRow = j;
            }
        }
        
        // Swap maximum row with current row
        if (maxRow !== i) {
            [augmentedMatrix[i], augmentedMatrix[maxRow]] = 
            [augmentedMatrix[maxRow], augmentedMatrix[i]];
        }
        
        // Make all rows below this one 0 in current column
        for (let j = i + 1; j < n; j++) {
            const factor = augmentedMatrix[j][i] / augmentedMatrix[i][i];
            for (let k = i; k <= n; k++) {
                augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k];
            }
        }
    }
    
    // Back substitution
    const solution = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += augmentedMatrix[i][j] * solution[j];
        }
        solution[i] = (augmentedMatrix[i][n] - sum) / augmentedMatrix[i][i];
    }
    
    return solution;
}

/**
 * Find the most common value in an array
 * @param {Array<number>} arr 
 * @returns {number} 
 */
function findMostCommon(arr) {
    const frequency = {};
    let maxCount = 0;
    let mostCommon = arr[0];
    
    for (const num of arr) {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxCount) {
            maxCount = frequency[num];
            mostCommon = num;
        }
    }
    
    return mostCommon;
}


const result = calculateConstantTerm(testCase.points, testCase.k);
console.log("Constant term:", result);
