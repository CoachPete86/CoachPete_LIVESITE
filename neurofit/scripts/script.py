import pandas as pd
import matplotlib.pyplot as plt

# Create a comprehensive competitive analysis dataset
data = {
    'Category': ['Corporate Wellness', 'Corporate Wellness', 'Corporate Wellness', 
                'Corporate Wellness', 'Corporate Wellness', 'Corporate Wellness',
                'Certification', 'Certification', 'Certification', 'Certification',
                'Mobile App', 'Mobile App', 'Mobile App', 'Mobile App', 'Mobile App',
                'Mobile App', 'Mobile App', 'Mobile App'],
    'Competitor': ['Virgin Pulse', 'Wellhub (Gympass)', 'Thrive Global', 
                   'Headspace for Work', 'Johnson & Johnson Wellness', 'Neuroscience-based Programs',
                   'NASM Specializations', 'ACSM Certifications', 'Precision Nutrition', 'Brain Fitness Certifications',
                   'Freeletics', 'Nike Training Club', 'Fitbod', 'Seven - 7 Minute Workout',
                   'Lumosity', 'Peak', 'Elevate', 'Personal Trainer AI'],
    'Price_Low': [13.50, 10, 50, 7.50, 20, 100,
                  199, 279, 799, 100,
                  6.99, 0, 12.99, 4.99,
                  11.95, 2, 4.99, 10],
    'Price_High': [53, 25, 200, 15, 100, 500,
                   899, 349, 999, 1000,
                   34.99, 0, 15.99, 9.99,
                   11.95, 8, 39.99, 20],
    'Unit': ['per employee per month', 'per employee per month', 'per employee per month',
             'per employee per month', 'per employee per month', 'per employee per month',
             'one-time certification', 'one-time certification', 'one-time certification', 'one-time certification',
             'per month', 'free', 'per month', 'per month',
             'per month', 'per month', 'per month/year', 'per month'],
    'Key_Features': [
        'Health challenges, biometric screening, coaching',
        'Gym network access, wellness programs, analytics',
        'Microsteps, behavioral change, stress management',
        'Meditation, mindfulness, mental health coaching',
        'Comprehensive health programs, ROI tracking',
        'Brain-based wellness, neurofeedback, cognitive training',
        'Various specializations (MMA, Wellness Coach, etc.)',
        'Exercise physiology, fitness assessment certifications',
        'Nutrition coaching, behavior change methods',
        'Brain health, cognitive fitness, neuroplasticity training',
        'AI personal trainer, bodyweight workouts, challenges',
        'Free workouts, Nike product integration, expert trainers',
        'Personalized strength training, progress tracking',
        '7-minute HIIT workouts, gamification, achievements',
        'Brain games, cognitive training, memory improvement',
        'Brain training games, competitions, personalization',
        'Language/communication focus, skill-based training',
        'AI form correction, real-time feedback, custom workouts'
    ]
}

# Create DataFrame
df = pd.DataFrame(data)

# Save to CSV for analysis
df.to_csv('neurofit_competitive_analysis.csv', index=False)

print("Competitive Analysis Dataset Created")
print("=" * 50)
print(df.to_string(index=False))