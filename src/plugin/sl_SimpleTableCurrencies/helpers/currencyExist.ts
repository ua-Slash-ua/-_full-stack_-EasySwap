export function currencyExists(tableLine: any[], targetName: string) {
  try{
    const currNames = tableLine.map((item: any) => item.currency.name?.trim());
    return currNames.includes(targetName?.trim());
  }
  catch (e){
    return false;
  }

}
