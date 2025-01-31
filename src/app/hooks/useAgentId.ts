import { useState, useEffect } from "react";
import { getAgentId } from "../utils/getAgentId";

export function useAgentId() {
  const [agentId, setAgentId] = useState("");

  useEffect(() => {
    // Function to update agent ID
    const updateAgentId = () => {
      const id = getAgentId();
      if (id) setAgentId(id);
    };

    // Update initially
    updateAgentId();

    // Set up polling to check for changes
    const interval = setInterval(updateAgentId, 1000);

    return () => clearInterval(interval);
  }, []);

  return agentId;
}
