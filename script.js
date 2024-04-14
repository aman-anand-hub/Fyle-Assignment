// Initialize tooltips for all elements with data-toggle="tooltip"
document.addEventListener('DOMContentLoaded', function() {
    var tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
    tooltips.forEach(function(tooltip) {
        new bootstrap.Tooltip(tooltip, {
            trigger: 'click'
        });
    });
});

// Function to hide all error icons
function hideAllErrors() {
    $('.error-icon').css('display', 'none');
}

// Function to show error icon and tooltip
function showError(elementId, errorMessage) {
    $('#' + elementId).css('display', 'inline').attr('title', errorMessage);
}

// handle form submission
function submitForm() {
    
    hideAllErrors();

    var grossIncome = parseFloat($('#grossIncome').val());
    var extraIncome = parseFloat($('#extraIncome').val());
    var deductions = parseFloat($('#deductions').val());
    var age = $('#age').val();

    var isValid = true;

    if (isNaN(grossIncome) || grossIncome < 0) {
        showError('grossIncomeError', 'Gross income is required or invalid');
        isValid = false;
    }

    if (isNaN(extraIncome) || extraIncome < 0) {
        showError('extraIncomeError', 'Extra income is required or invalid');
        isValid = false;
    }

    if (isNaN(deductions) || deductions < 0) {
        showError('deductionsError', 'Deductions are required or invalid');
        isValid = false;
    }

    if (age === '') {
        showError('ageError', 'Age group is required');
        isValid = false;
    }

    if (isValid) {
        var taxRate;

        switch (age) {
            case 'below40':
                taxRate = 0.3;
                break;

            case '40to60':
                taxRate = 0.4;
                break;

            case 'above60':
                taxRate = 0.1;
                break;
        }

        var overallIncome = grossIncome + extraIncome - deductions;
        // tax only applicable over 8 lakhs
        var taxableIncome = Math.max(0, overallIncome - 800000);
        // tax amount
        var taxAmount = taxRate * taxableIncome;
        // Calculate net income after tax deduction
        var netIncome = overallIncome - taxAmount;

        // Display result in modal
        $('#resultBody')
            .html('<h2>Your overall income will be</h2><h4>' + netIncome.toFixed(2) + '</h4> <h6>after tax deduction</h6>');
        $('#resultModal').modal('show');
    }
}