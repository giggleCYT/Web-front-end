var currentMoney=alert("我想对你说：");
                    while(option!='4') {
                        var option=prompt('请输入你要的操作：\n1.爱我\n2.更爱我\n3.超爱我\n4.永远爱我');
                        switch(option){
                            case '1': 
                            var save=parseInt(prompt('你爱我？'));
                            while(i !== "爱你"){
                                i = prompt("你爱我？")
                                }
                            alert('我超爱你的');
                            break;
                            case '2': 
                            var take=parseInt(prompt('你会不会更爱我？'));
                            while(i !== "会"){
                                i = prompt("你会不会更爱我？")
                                }
                            alert('一直一直都爱你哟❤');
                            break;
                            case '3': 
                            var take=parseInt(prompt('你是不是超爱我？'));
                            while(i !== "是"){
                                i = prompt("你是不是超爱我？")
                                }
                            alert('啊~我也超级爱你呢');
                            break;
                            case '4': 
                            alert('我也永远爱你');
                            break;
                        }
                    }