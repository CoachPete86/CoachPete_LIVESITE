import pandas as pd
import plotly.graph_objects as go

# Load the data
df = pd.read_csv("neurofit_competitive_analysis.csv")

# Define colors for each category using the brand colors in order
category_colors = {
    'Corporate Wellness': '#1FB8CD',  # Strong cyan
    'Certification': '#DB4545',      # Bright red  
    'Mobile App': '#2E8B57'          # Sea green
}

# Sort data by category and then by competitor name for better organization
df_sorted = df.sort_values(['Category', 'Competitor'])

# Create the figure
fig = go.Figure()

# Add horizontal bars for each competitor
for i, row in df_sorted.iterrows():
    # Calculate the width of the bar (difference between high and low)
    bar_width = row['Price_High'] - row['Price_Low']
    
    # Create hover text with pricing details
    hover_text = f"{row['Competitor']}<br>Category: {row['Category']}<br>Range: ${row['Price_Low']:.1f} - ${row['Price_High']:.1f} {row['Unit']}"
    
    fig.add_trace(go.Bar(
        name=row['Category'],
        y=[row['Competitor']],
        x=[bar_width],
        base=[row['Price_Low']],
        orientation='h',
        marker_color=category_colors[row['Category']],
        hovertemplate=hover_text + '<extra></extra>',
        showlegend=False  # We'll handle legend manually
    ))

# Add legend items manually to avoid duplicates
for category, color in category_colors.items():
    fig.add_trace(go.Scatter(
        x=[None], y=[None],
        mode='markers',
        marker=dict(size=10, color=color),
        name=category,
        showlegend=True
    ))

# Update layout
fig.update_layout(
    title='Competitive Pricing Analysis',
    xaxis_title='Price Range ($)',
    yaxis_title='Competitors',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5),
    yaxis=dict(categoryorder='array', categoryarray=df_sorted['Competitor'].tolist()),
    barmode='overlay'
)

# Update traces to remove cliponaxis
fig.update_traces(cliponaxis=False)

# Update x-axis to show price formatting
fig.update_xaxes(tickformat='$,.0f')

# Save the chart
fig.write_image("competitive_pricing_chart.png")
fig.show()