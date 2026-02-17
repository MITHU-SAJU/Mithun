import { useState, useEffect } from 'react';
import { fetchExperience } from '../services/api';

export function useExperience() {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchExperience()
            .then(data => setExperience(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { experience, loading, error };
}
