export * from './eventsSubscription.service';
import { EventsSubscriptionService } from './eventsSubscription.service';
// export * from './logicalResource.service';
// import { LogicalResourceService } from './logicalResource.service';
// export * from './notificationListenersClientSide.service';
// import { NotificationListenersClientSideService } from './notificationListenersClientSide.service';
// export * from './physicalResource.service';
// import { PhysicalResourceService } from './physicalResource.service';
export * from './resource.service';
import { ResourceService } from './resource.service';
export const APIS = [EventsSubscriptionService, ResourceService];