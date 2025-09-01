# Create a pricing recommendation analysis for NeuroFit
import pandas as pd

# Create pricing recommendations based on competitive analysis
pricing_recommendations = {
    'Service Category': [
        'Corporate Workshop Packages',
        'Corporate Workshop Packages', 
        'Corporate Workshop Packages',
        'Certification Program - Level 1',
        'Certification Program - Level 2',  
        'Certification Program - Level 3',
        'Mobile App - Free Tier',
        'Mobile App - Pro Tier',
        'Mobile App - Enterprise Tier'
    ],
    'Package/Tier': [
        'Basic Workshop (1-2 hours)',
        'Premium Workshop (3-4 hours)', 
        'Elite Workshop Series (Multi-session)',
        'Cognitive Fitness Foundation',
        'Advanced Neuroscience Training',
        'Master Trainer Certification',
        'Basic (Limited features)',
        'Individual Premium',
        'Corporate/Team Accounts'
    ],
    'Recommended Price': [
        '£25 per employee',
        '£45 per employee',
        '£75 per employee', 
        '£399',
        '£699',
        '£999',
        'Free',
        '£8.99/month',
        '£149/month (up to 50 users)'
    ],
    'Competitive Positioning': [
        'Mid-range vs Virgin Pulse (£13.50-53), premium vs Headspace (£7.50-15)',
        'Premium positioning vs most competitors, justified by neuroscience focus',
        'High-end positioning for comprehensive multi-session programs',
        'Competitive with NASM specializations (£199-899), below brain certifications',
        'Premium pricing for advanced content, middle of certification market',
        'Top-tier pricing justified by unique neuroscience + fitness combination',
        'Standard freemium model to drive adoption',
        'Mid-range vs Freeletics (£6.99-34.99), premium vs Seven (£4.99-9.99)',
        'Enterprise pricing competitive with corporate wellness solutions'
    ],
    'Justification': [
        'Unique neuroscience approach commands premium over basic wellness',
        'Multi-hour format with expert content justifies higher per-employee cost',
        'Comprehensive program with ongoing support warrants premium pricing',
        'Entry-level certification accessible to fitness professionals',
        'Advanced content with neuroscience depth supports higher pricing',
        'Unique combination of cognitive science + fitness training',
        'Market standard for user acquisition and app trial',
        'AI features and neuroscience content justify premium over basic apps',
        'B2B value with team management and analytics features'
    ]
}

pricing_df = pd.DataFrame(pricing_recommendations)
pricing_df.to_csv('neurofit_pricing_recommendations.csv', index=False)

print("NeuroFit Pricing Recommendations")
print("=" * 50)
print(pricing_df.to_string(index=False))

print("\n\nKey Insights:")
print("- Corporate workshops positioned at premium due to neuroscience specialization")
print("- Certification program competitively priced within fitness education market") 
print("- Mobile app uses freemium model with premium features for differentiation")
print("- All pricing justified by unique cognitive fitness positioning")