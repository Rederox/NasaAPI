export const errorsCodes = {
        CUSTOM_ERROR_CODE : 1000, // Code d'erreur personnalisé
        CUSTOM_ERROR_NAME : "Custom error", // Nom de l'erreur personnalisée
        CUSTOM_ERROR_MESSAGE : "Erreur inattendue", // Message de l'erreur personnalisée

        API_ERROR_CODE : 2000, // Code d'erreur de l'API
        API_ERROR_NAME : "Api error", // Nom de l'erreur de l'API
        API_ERROR_MESSAGE : "Erreur lors de la récupération des données de l'API", // Message de l'erreur de l'API

        DATABASE_ERROR_CODE : 2001, // Code d'erreur de la base de données
        DATABASE_ERROR_NAME : "Database error", // Nom de l'erreur de la base de données
        DATABASE_ERROR_MESSAGE : "Erreur lors de la récupération des données en base de données", // Message de l'erreur de la base de données

        NOT_INTEGER_ERROR_CODE : 2002, // Code d'erreur de non-entier
        NOT_INTEGER_ERROR_NAME : "Not integer error", // Nom de l'erreur de non-entier
        NOT_INTEGER_ERROR_MESSAGE : "La valeur n'est pas un entier", // Message de l'erreur de non-entier

        INCORRECT_DATE_ERROR_CODE : 2003, // Code d'erreur de date incorrecte
        INCORRECT_DATE_ERROR_NAME : "Incorrect date error", // Nom de l'erreur de date incorrecte
        INCORRECT_DATE_ERROR_MESSAGE : "La date n'est pas au bon format (YYYY-MM-DD)", // Message de l'erreur de date incorrecte

        DATE_LIMIT_ERROR_CODE : 2004, // Code d'erreur de limite de date
        DATE_LIMIT_ERROR_NAME : "Date limit error", // Nom de l'erreur de limite de date
        DATE_LIMIT_ERROR_MESSAGE : "La période ne doit pas dépasser 7 jours", // Message de l'erreur de limite de date

        PARMETERS_MISSING_ERROR_CODE : 2005, // Code d'erreur de paramètres manquants
        PARMETERS_MISSING_ERROR_NAME : "Parameters missing error", // Nom de l'erreur de paramètres manquants
        PARMETERS_MISSING_ERROR_MESSAGE : "Les paramètres sont manquants", // Message de l'erreur de paramètres manquants

    };