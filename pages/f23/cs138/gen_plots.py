
# Quick-and-dirty helper script for generating plots used in the answer 
# options for one of the questions

import numpy as np
import matplotlib.pyplot as plt

# Generate option a
x = np.array([0, 100, 10000])
y_lo = np.array([0, 0.9, 0.93])
y_hi = np.array([0, 0.8, 0.83])
plt.xlabel('Time Step')
plt.ylabel('Average Reward Acorss Runs')
plt.plot(x, y_lo, label='Low Epsilon Value')
plt.plot(x, y_hi, label='High Epsilon Value')
plt.legend()
plt.savefig('Quiz Q1-1.PNG')
plt.clf()

# Generate option b
x = np.array([0, 100, 10000])
y_lo = np.array([0, 0.8, 0.83])
y_hi = np.array([0, 0.9, 0.93])
plt.xlabel('Time Step')
plt.ylabel('Average Reward Acorss Runs')
plt.plot(x, y_lo, label='Low Epsilon Value')
plt.plot(x, y_hi, label='High Epsilon Value')
plt.legend()
plt.savefig('Quiz Q1-2.PNG')
plt.clf()

# Generate option c
x = np.array([0, 100, 10000])
y_lo = np.array([0, 0.9, 0.92])
y_hi = np.array([0, 0.8, 0.95])
plt.xlabel('Time Step')
plt.ylabel('Average Reward Acorss Runs')
plt.plot(x, y_lo, label='Low Epsilon Value')
plt.plot(x, y_hi, label='High Epsilon Value')
plt.legend()
plt.savefig('Quiz Q1-3.PNG')
plt.clf()

# Generate option d
x = np.array([0, 100, 10000])
y_lo = np.array([0, 0.8, 0.95])
y_hi = np.array([0, 0.9, 0.92])
plt.xlabel('Time Step')
plt.ylabel('Average Reward Acorss Runs')
plt.plot(x, y_lo, label='Low Epsilon Value')
plt.plot(x, y_hi, label='High Epsilon Value')
plt.legend()
plt.savefig('Quiz Q1-4.PNG')
plt.clf()


