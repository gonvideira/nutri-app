import React, { useEffect, useState } from 'react';
import { base } from '../utilities/airtable'; // Your Airtable instance

const ClientsList = ({ recordId }) => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [statusFilter, setStatusFilter] = useState('Active'); // Default filter to 'Active'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch linked clients
    const fetchClients = async () => {
      try {
        const nutritionistRecord = await base('Nutritionists').find(recordId);
        
        // Fetch linked clients from the 'Clients' field
        const linkedClientIds = nutritionistRecord.fields.Clients;

        // Retrieve all client records
        const clientRecords = await base('Clients').select({
          filterByFormula: `OR(${linkedClientIds.map(id => `RECORD_ID() = "${id}"`).join(', ')})`
        }).all();

        setClients(clientRecords);
        setFilteredClients(clientRecords.filter(client => client.fields.Status === statusFilter));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setLoading(false);
      }
    };

    if (recordId) {
      fetchClients();
    }
  }, [recordId, statusFilter]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatusFilter(newStatus);
    setFilteredClients(clients.filter(client => client.fields.Status === newStatus));
  };

  if (loading) return <p>Loading clients...</p>;

  return (
    <div>
      {/* Dropdown for filtering clients by status */}
      <label htmlFor="statusFilter">Filter by status: </label>
      <select id="statusFilter" value={statusFilter} onChange={handleStatusChange}>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Pending">Pending</option>
        {/* Add more status options as needed */}
      </select>

      {/* Display clients in a gallery-style layout */}
      <div className="clients-gallery">
        {filteredClients.map(client => (
          <div key={client.id} className="client-card">
            <img src={client.fields['Profile Picture'][0].url} alt={client.fields.Name} className="client-img" />
            <h5>{client.fields.Name}</h5>
            <p>Status: {client.fields.Status}</p>
            {/* Additional client details if necessary */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsList;
