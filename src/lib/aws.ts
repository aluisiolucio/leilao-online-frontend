import axios from 'axios';

export const uploadImagesAwsS3 = async (image: File) => {
    if (!image) return;

    try {
        const host = import.meta.env.API_HOST_PORT;
        const response = await axios.get(
            `http://${host}/api/auth/presigned-url?key=${encodeURIComponent(image.name)}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        );

        const url = response.data.url;

        await axios.put(url, image, {
            headers: {
                'Content-Type': image.type,
            }
        });

        return encodeURIComponent(image.name);
    } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
    }
};