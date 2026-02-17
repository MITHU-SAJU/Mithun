import { useState, useEffect } from 'react';
import { fetchProjects } from '../services/api';

export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjects()
            .then(data => setProjects(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { projects, loading, error };
}
