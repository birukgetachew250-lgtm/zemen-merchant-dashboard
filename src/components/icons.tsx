export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="hsl(var(--primary))"
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"
      />
      <path
        fill="hsl(var(--primary))"
        d="M168 88H88a8 8 0 0 0 0 16h80a8 8 0 0 0 0-16Zm-8 40a8 8 0 0 0-8-8h-24v-8a8 8 0 0 0-16 0v8h-8a8 8 0 0 0 0 16h8v24a8 8 0 0 0 16 0v-24h24a8 8 0 0 0 8-8Z"
      />
    </svg>
  );
  