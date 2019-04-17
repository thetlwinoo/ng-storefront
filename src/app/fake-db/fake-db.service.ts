import { InMemoryDbService } from 'angular-in-memory-web-api';

import { CategoryFakeDb } from 'app/fake-db/categories';
import { BrandFakeDb } from 'app/fake-db/brands';
import { SearchFakeDb } from 'app/fake-db/search';
import { ChatFakeDb } from 'app/fake-db/chat';
import { ChatPanelFakeDb } from 'app/fake-db/chat-panel';
import { ProductsFakeDb } from 'app/fake-db/products';

export class FakeDbService implements InMemoryDbService {
    createDb(): any {
        return {
            'categories': CategoryFakeDb.categories,
            'products': ProductsFakeDb.products,
            'banner_categories': CategoryFakeDb.bannerCategories,
            'brands': BrandFakeDb.brands,
            'servicesandpromotions': CategoryFakeDb.servicesandpromotions,
            'condition': CategoryFakeDb.condition,
            'tags': CategoryFakeDb.tags,
            'default_keywords': SearchFakeDb.defaultKeywords,

            // Chat
            'chat-contacts': ChatFakeDb.contacts,
            'chat-chats': ChatFakeDb.chats,
            'chat-user': ChatFakeDb.user,

            // Chat Panel
            'chat-panel-contacts': ChatPanelFakeDb.contacts,
            'chat-panel-chats': ChatPanelFakeDb.chats,
            'chat-panel-user': ChatPanelFakeDb.user,
        };
    }
}
