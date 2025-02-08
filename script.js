document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculatorForm');
    const results = document.getElementById('results');
    // Result elements
    const currentOverheadElement = document.getElementById('currentOverhead');
    const newOverhead1Element = document.getElementById('newOverhead1');
    const totalLossElement = document.getElementById('totalLoss');
    const newNihFundingElement = document.getElementById('newNihFunding');
    const newOverhead2Element = document.getElementById('newOverhead2');
    const netImpactElement = document.getElementById('netImpact');

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const calculateImpact = (totalFunding, currentRate) => {
        // Convert percentages to decimals
        const currentRateDecimal = currentRate / 100;
        const newRateDecimal = 0.15; // 15%

        // Calculate direct costs from total funding
        const directCosts = totalFunding / (1 + currentRateDecimal);

        // Calculate overhead amounts
        const currentOverhead = totalFunding - directCosts;

        const newDirectCosts = totalFunding / (1 + newRateDecimal);
        const newOverhead1 = totalFunding - newDirectCosts;
        
        // Calculate total loss if total funding remains the same
        const totalLoss1 = currentOverhead - newOverhead1;

        // Calculate impact if direct costs are maintained
        const newTotalFunding = directCosts * (1 + newRateDecimal);
        const newOverhead2 = newTotalFunding - directCosts;
        const netImpact = totalFunding - newTotalFunding;

        return {
            currentOverhead,
            newOverhead1,
            totalLoss1,
            directCosts,
            newTotalFunding,
            newOverhead2,
            netImpact
        };
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const totalFundingField = document.getElementById('totalFunding');
        const currentRateField = document.getElementById('currentRate');
        
        if (!totalFundingField.value || !currentRateField.value) {
            return; // Don't proceed if either input is empty
        }
        
        const totalFunding = parseFloat(totalFundingField.value);
        const currentRate = parseFloat(currentRateField.value);

        if (isNaN(totalFunding) || isNaN(currentRate)) {
            return; // Don't proceed if parsing fails
        }

        const impact = calculateImpact(totalFunding, currentRate);

        // Update results
        currentOverheadElement.textContent = formatCurrency(impact.currentOverhead);
        newOverhead1Element.textContent = formatCurrency(impact.newOverhead1);
        totalLossElement.textContent = formatCurrency(impact.totalLoss1);
        newNihFunding.textContent = formatCurrency(impact.newTotalFunding);
        newOverhead2Element.textContent = formatCurrency(impact.newOverhead2);
        netImpactElement.textContent = formatCurrency(impact.netImpact);

        // Show results
        results.classList.remove('hidden');
    });
});
