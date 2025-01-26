import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";

// Alert Component
const AlertComponent = ({ id, type, message, onClose }) => {
    // Get the style based on the alert type and id
    const getStyleByType = () => {
      // Customize style based on alert type
      switch (type) {
        case "alertSuccess":
          return { color: "#28a745" };
        case "alertError":
          return { color: "#dc3545" };
        case "alertWarning":
          return { color: "#ffc107", color: "black" };
        case "alertInfo":
        default:
          return { color: "#17a2b8" };
      }
    };
  
    return (
      <div style={{...getStyleByType(), 
        position: "fixed",
        top: "10%",
        left: "50%",
        width: "40%",
        transform: "translate(-50%, -10%)",
        zIndex: 100000,
        boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
        border: "none",
        borderBottom: "6px solid",
        fontSize: "110%",
        background: "#eaeaea",
        overflow: "hidden",
        marginBottom: "15px",
        
      }} >
      <div style={{
        padding: ".75rem 1.25rem",
        borderRadius: ".25rem",
        display: "flex",
        alignItems: "center",
        color: "black",
        justifyContent: "space-between"
        }} >
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "red",
            fontSize: "20px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          ×
        </button>
      </div>
      </div>
    );
  };

 


// Alert Context
const AlertContext = createContext();

// Global Alert Class
class CustomAlert {
  static alertContext = null;

  static setContext(context) {
    this.alertContext = context;
  }

  static alertSuccess(message, options = {}, onDismiss = null) {
    if (!this.alertContext) {
      console.alertError("CustomAlert.alertContext is not set.");
      return;
    }
    return this.alertContext.alertSuccess(message, options.timeOut, onDismiss);
  }

  static alertError(message, options = {}, onDismiss = null) {
    return this.alertContext.alertError(message, options.timeOut, onDismiss);
  }

  static alertWarning(message, options = {}, onDismiss = null) {
    return this.alertContext.alertWarning(message, options.timeOut, onDismiss);
  }

  static alertInfo(message, options = {}, onDismiss = null) {
    return this.alertContext.alertInfo(message, options.timeOut, onDismiss);
  }

  static closeAlert(id) {
    return this.alertContext.close(id);
  }

  static closeAll() {
    return this.alertContext.closeAll();
  }
}

// Alert Provider
export const OCAlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((message, type = "alertInfo", duration = 5000, onDismiss = null) => {
    const id = Date.now();
    setAlerts((prevAlerts) => [...prevAlerts, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        closeAlert(id);
        onDismiss && onDismiss();
      }, duration);
    }
  }, []);

  const closeAlert = useCallback((id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  }, []);

  const closeAllAlerts = useCallback(() => setAlerts([]), []);

  const contextValue = useMemo(() => {
    const methods = {
      alertSuccess: (message, duration, onDismiss) => showAlert(message, "alertSuccess", duration, onDismiss),
      alertError: (message, duration, onDismiss) => showAlert(message, "alertError", duration, onDismiss),
      alertWarning: (message, duration, onDismiss) => showAlert(message, "alertWarning", duration, onDismiss),
      alertInfo: (message, duration, onDismiss) => showAlert(message, "alertInfo", duration, onDismiss),
      close: closeAlert,
      closeAll: closeAllAlerts,
    };

    CustomAlert.setContext(methods);
    return methods;
  }, [showAlert, closeAlert, closeAllAlerts]);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
        {alerts.map((alert) => (
          <AlertComponent
            key={alert.id}
            id={alert.id}
            type={alert.type}
            message={alert.message}
            onClose={() => closeAlert(alert.id)} // Close the alert when the button is clicked
          />
        ))}
    </AlertContext.Provider>
  );
};

// Custom Hook
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an OCAlertsProvider");
  }
  return context;
};

// Export CustomAlert as a named export
export const OCAlert = CustomAlert;

