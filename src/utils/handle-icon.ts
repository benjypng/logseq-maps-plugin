export const svgIcon = (host: any, color: string, size: number) => {
  const half = size / 2
  return host.L.divIcon({
    className: 'clear-marker-styles',
    html: `
      <div style="
        width: ${size}px; 
        height: ${size}px; 
        display: flex; 
        align-items: center; 
        justify-content: center;
        background: transparent;
        margin: 0;
        padding: 0;
      ">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="${size}px" 
          height="${size}px" 
          viewBox="0 0 24 24" 
          fill="${color ?? '#2A81CB'}" 
          style="width: ${size}px; height: ${size}px; display: block;"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [half, size],
    popupAnchor: [0, half],
  })
}
