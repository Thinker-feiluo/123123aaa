export function getNotification(title: string | undefined, message: string | undefined, type: 'success' | 'warning' | 'info' | 'error') {
    ElNotification({
        title: title,
        message: message,
        type: type,
    })
}