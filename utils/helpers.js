/**
 * Formats a timestamp as a localized date string
 *
 * @method formatDate
 * @param {string} timestamp Timestamp string
 * @returns {string} Localized date string
 */
const formatDate = (timestamp) => new Date(timestamp).toLocaleDateString();

module.exports = { formatDate };
