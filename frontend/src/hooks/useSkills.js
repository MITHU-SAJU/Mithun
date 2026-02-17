import { useState, useEffect } from 'react';
import { fetchSkills } from '../services/api';

export function useSkills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSkills()
            .then(data => setSkills(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { skills, loading, error };
}
