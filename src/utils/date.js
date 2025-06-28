/**
 * 格式化日期为 YYYY-MM-DD
 */
export const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * 格式化时间为 HH:mm
 */
export const formatTime = (time) => {
    if (!time) return '';
    const d = new Date(time);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

/**
 * 格式化日期时间 YYYY-MM-DD HH:mm
 */
export const formatDateTime = (date) => {
    return `${formatDate(date)} ${formatTime(date)}`;
};