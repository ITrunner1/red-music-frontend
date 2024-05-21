'use client'

function formatNumberToK(num: number) {
    if(num >= 1000000000) 
        return (num/1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    
    if(num >= 10000000) 
        return (num/10000000).toFixed(1).replace(/\.0$/, '') + ' M';
    
    if(num >= 100000) 
        return (num/100000).toFixed(1).replace(/\.0$/, '') + ' Lac';

    if(num >= 1000) 
        return (num/1000).toFixed(1).replace(/\.0$/, '') + 'K';
    
    return num;
}