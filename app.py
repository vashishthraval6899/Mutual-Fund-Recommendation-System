import streamlit as st
import pandas as pd
import plotly.express as px  # Recommended for interactive charts

# --- 1. Load Data ---
# Use st.cache_data to load the data once and speed up the app
@st.cache_data
def load_data():
    # Replace 'your_data.csv' with the actual path to your data file
    # Ensure this file is in the same directory as app.py
    df = pd.read_csv('your_data.csv') 
    return df

data = load_data()

# --- 2. Title and Layout ---
st.title('💰 Top Mutual Fund Explorer')
st.markdown('Filter and visualize the top funds based on risk and return criteria.')

# Create two columns for a clean, elegant side-by-side layout
col1, col2, col3, col4, col5 = st.columns(5)

# --- 3. Filters using st.selectbox in the defined columns ---
fund_type = col1.selectbox(
    'Fund Type', 
    options=data['Fund_Type'].unique()
)

return_type = col2.selectbox(
    'Return Type', 
    options=data['Return_Type'].unique()
)

risk_type = col3.selectbox(
    'Risk Type', 
    options=data['Risk_Type'].unique()
)

adj_risk_type = col4.selectbox(
    'Adj. Risk Type', 
    options=data['Adjusted_Risk_Type'].unique()
)

top_n = col5.selectbox(
    'Top N Funds', 
    options=[5, 10, 15, 20], 
    index=1 # Default to 10
)

# --- 4. Apply Filtering and Sorting Logic ---

# Filter by all four selection criteria
filtered_data = data[
    (data['Fund_Type'] == fund_type) &
    (data['Return_Type'] == return_type) &
    (data['Risk_Type'] == risk_type) &
    (data['Adjusted_Risk_Type'] == adj_risk_type)
]

# Sort the filtered results by a key metric (e.g., Return_Value)
# This is crucial to select the 'Top N'
sorted_data = filtered_data.sort_values(
    by='Return_Value', # Assuming a higher return is better
    ascending=False
)

# Apply the 'Top N' slice
top_n_data = sorted_data.head(top_n)

# --- 5. Display Results ---
st.header(f"Top {top_n} Funds Matching Your Criteria")
st.dataframe(top_n_data) 
# Use st.dataframe for an interactive, scrollable table

# --- 6. Graphs ---
st.header("Risk and Return Visualization")
chart_col1, chart_col2 = st.columns(2)

# Graph 1: Scatter Plot (Risk vs. Return)
with chart_col1:
    st.subheader("Return vs. Risk")
    fig_scatter = px.scatter(
        top_n_data,
        x='Risk_Value',    # Example: Risk (Volatility)
        y='Return_Value',  # Example: Annualized Return
        hover_data=['Fund_Name'],
        title='Risk (X-axis) vs. Return (Y-axis)'
    )
    st.plotly_chart(fig_scatter, use_container_width=True)

# Graph 2: Bar Chart (Individual Fund Returns)
with chart_col2:
    st.subheader("Individual Fund Returns")
    fig_bar = px.bar(
        top_n_data,
        x='Fund_Name',
        y='Return_Value',
        title='Top N Funds by Return'
    )
    st.plotly_chart(fig_bar, use_container_width=True)

# Graph 3 (Optional: e.g., Risk Adjusted Value)
# You could add another graph below the two columns
