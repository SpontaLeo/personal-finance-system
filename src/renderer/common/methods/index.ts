import { routingStore } from '../../stores';

export function goBack() {
  routingStore.goBack();
}

export function generateBrief(html: string, length: number = 120): string {
  if (html.length < length) return html;
  let Foremost = html.substr(0, length);
  const reg = /<(\/?)(BODY|SCRIPT|P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|TABLE|TR|TD|TH|INPUT|SELECT|htmlAREA|OBJECT|A|UL|OL|LI|BASE|META|LINK|HR|BR|PARAM|IMG|AREA|INPUT|SPAN)[^>]*(>?)/gi;
  const singlable = /BASE|META|LINK|HR|BR|PARAM|IMG|AREA|INPUT/i;
  const Stack = [],
    posStack = [];
  while (true) {
    var newone = reg.exec(Foremost);
    if (newone == null) break;

    if (newone[1] === '') {
      var Elem = newone[2];
      if (Elem.match(singlable) && newone[3] !== '') {
        continue;
      }
      Stack.push(newone[2].toUpperCase());
      posStack.push(newone.index);

      if (newone[3] === '') break;
    } else {
      var StackTop = Stack[Stack.length - 1];
      var End = newone[2].toUpperCase();
      if (StackTop === End) {
        Stack.pop();
        posStack.pop();
        if (newone[3] === '') {
          Foremost = Foremost + '>';
        }
      }
    }
  }
  const cutpos = posStack.shift();
  Foremost = Foremost.substring(0, cutpos);

  return replaceHtmlTag(Foremost);
}

function replaceHtmlTag(html: string): string {
  return html.replace(/<[^<>]+>/g, '');
}
