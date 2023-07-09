import { Observable, filter } from "rxjs";

interface NewsItem {
  category: "Business" | "Sports";
  content: string;
}

const newsFeed$ = new Observable<NewsItem>((subscriber) => {
  setTimeout(() => {
    subscriber.next({ category: "Business", content: "A" });
  }, 1000);
  setTimeout(() => {
    subscriber.next({ category: "Sports", content: "B" });
  }, 3000);
  setTimeout(() => {
    subscriber.next({ category: "Business", content: "C" });
  }, 4000);
  setTimeout(() => {
    subscriber.next({ category: "Sports", content: "D" });
  }, 6000);
  setTimeout(() => {
    subscriber.next({ category: "Business", content: "E" });
  }, 7000);
});

const sportsNewsFeed$ = newsFeed$.pipe(
  filter((news) => news.category === "Sports")
);

sportsNewsFeed$.subscribe((item) => console.log("sportsNewsFeed$: ", item));

//newsFeed$.subscribe((item) => console.log("newsFeed$: ", item));
