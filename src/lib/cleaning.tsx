export const cleanServerRegion = (region: string): JSX.Element => {
  switch (region) {
    case 'Europe_Central':
      return <>EU</>
    case 'America_Central':
      return <>US</>
    case 'Brazil_Central':
      return <>BR</>
    case 'Japan_Central':
      return <>JP</>
    case 'Australia_Central':
      return <>AU</>
    default:
      return <>{region}</>
  }
}
