# ifo-custom-alert

`ifo-custom-alert` is a simple and customizable React library for displaying alert notifications in your application. It provides an easy-to-use API for showing success, error, warning, and info alerts.

---

## Installation

Install the package using npm or yarn:

```bash
npm install ifo-custom-alert
```
Usage
Step 1: Wrap Your Application with OCAlertsProvider

To enable alerts in your app, wrap your main application component with the OCAlertsProvider.
```jsx
import React from "react";
import { OCAlertsProvider } from "ifo-custom-alert";

const App = () => {
  return (
    <OCAlertsProvider>
      <YourApp />
    </OCAlertsProvider>
  );
};

export default App;
```
Step 2: Use OCAlert in Your Component

You can directly call OCAlert methods to trigger alerts in your components.

```jsx
import React from "react";
import { OCAlert } from "ifo-custom-alert";

export const Home = () => {
  const handleClick = () => {
    OCAlert.alertSuccess("This is a success message!");
    OCAlert.alertError("An error occurred!");
    OCAlert.alertWarning("Warning: Check your input!");
    OCAlert.alertInfo("This is an informational alert!");
  };

  return (
    <div>
      <button onClick={handleClick}>Show Alerts</button>
    </div>
  );
};
```
Alert Types

You can use the following methods to trigger different types of alerts:
Method	Description
alertSuccess	Displays a success alert.
alertError	Displays an error alert.
alertWarning	Displays a warning alert.
alertInfo	Displays an informational alert.

Optional Alert Dismiss Timing

Alerts automatically dismiss after 5 seconds by default. You can customize the dismiss time by passing a second argument:
```jsx
OCAlert.alertSuccess("Success message", 3000); // Dismisses after 3 seconds
OCAlert.alertError("Error message", 7000);    // Dismisses after 7 seconds
```

