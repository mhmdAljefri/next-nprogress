# nextjs-nprogress

An unofficial nextjs wrapper of nprogress package.

## Installing
```sh
npm i @mhmdaljefri/next-nprogress # yarn add @mhmdaljefri/next-nprogress
```

## Example

### Adding nprogress default configurations and styles

```jsx
import NextNPregress from "@mhmdaljefri/next-nprogress";
// ... code
<NextNPregress />
// ... code
```

### Adding nprogress with customer configurations and styles


```jsx
import NextNPregress from "@mhmdaljefri/next-nprogress";
// ... code
<NextNPregress
  configurationOptions={{
    stopDelay: 400,
    color: "red",
    showSpinner: false,
  }}
/>
// ... code
```

### Using context to change configurations and styles

```jsx
import NextNPregress, { useUpdateProgressConfig } from "@mhmdaljefri/next-nprogress";
// ... code
return (
  <NextNPregress
    configurationOptions={{
      stopDelay: 400,
      color: "red",
      showSpinner: false,
    }}
  >
    <Component>
  <NextNPregress>
)
// ... code



const Component = () => {
  const updateProgressConfig = useUpdateProgressConfig()

  React.useEffect(() => {
    updateProgressConfig({ color: 'blue' });
  })

  return (
    <div>
      {/* code here */}
    </div>
  )
}
```

